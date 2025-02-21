from flask import Flask, request, jsonify, render_template
import spacy
import requests
from textblob import TextBlob
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
from newspaper import Article
import os

app = Flask(__name__)

# Load spaCy model for named entity recognition (NER)
nlp = spacy.load("en_core_web_sm")

# Google Fact Check API Key
google_fact_check_api_key = os.getenv("AIzaSyBWUPH7tQj5zTJkmo5-9Uwoqf_b8Yj8CTU")

def extract_key_sentences(article_text, num_sentences=2):
    parser = PlaintextParser.from_string(article_text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    key_sentences = summarizer(parser.document, num_sentences)
    return [str(sentence) for sentence in key_sentences]

def check_source_credibility(source_url):
    news_guard_ratings = {
        "cnn.com": 0.9,
        "bbc.com": 0.95,
        "foxnews.com": 0.7,
        "randomblog.xyz": 0.2,
    }
    return news_guard_ratings.get(source_url, 0.5)

def check_fact_with_google(query):
    url= "https://factchecktools.googleapis.com/v1alpha1/claims:search?query=test&key=AIzaSyBWUPH7tQj5zTJkmo5-9Uwoqf_b8Yj8CTU"

    try:
        response = requests.get(url)
        data = response.json()
        if "claims" in data and data["claims"]:
            results = []
            for claim in data["claims"]:
                claim_text = claim["text"]
                claimant = claim.get("claimant", "Unknown")
                claim_date = claim.get("claimDate", "Unknown Date")
                for review in claim["claimReview"]:
                    source = review["publisher"]["name"]
                    source_url = review["url"]
                    review_title = review["title"]
                    rating = review.get("textualRating", "No rating")
                    confidence = review.get("confidence", 0.5)  # Use if available
                    results.append({
                        "claim": claim_text,
                        "claimant": claimant,
                        "date": claim_date,
                        "source": source,
                        "source_url": source_url,
                        "review_title": review_title,
                        "rating": rating,
                        "confidence": confidence
                    })
            return results
        else:
            return "No fact-checking results found."
    except Exception as e:
        return f"Error: {e}"

def sentiment_analysis(article_text):
    blob = TextBlob(article_text)
    return blob.sentiment.polarity

def compute_credibility(fact_check_result, source_credibility, sentiment_score):
    credibility_score = 0.5  # Base score
    
    if isinstance(fact_check_result, list):
        high_confidence_results = [entry for entry in fact_check_result if entry.get("confidence", 0.5) > 0.7]
        if high_confidence_results:
            credibility_score = 0.8
        else:
            credibility_score = 0.6
    else:
        credibility_score = 0.4  # Default if no fact-checking results
    
    credibility_score = (credibility_score * 0.6) + (source_credibility * 0.4)
    
    if abs(sentiment_score) > 0.5:
        credibility_score *= 0.9
    return round(credibility_score, 2)

def fetch_article_text(url):
    try:
        article = Article(url)
        article.download()
        article.parse()
        return article.text
    except Exception as e:
        return f"Error fetching article: {e}"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    article_url = data.get("url")
    article_text = fetch_article_text(article_url)
    if article_text.startswith("Error"):
        return jsonify({"error": article_text})
    
    key_sentences = extract_key_sentences(article_text)
    source_credibility = check_source_credibility(article_url)
    sentiment_score = sentiment_analysis(article_text)
    fact_check_result = check_fact_with_google(" ".join(key_sentences))
    
    adjusted_score = compute_credibility(fact_check_result, source_credibility, sentiment_score)
    
    return jsonify({
        "key_sentences": key_sentences,
        "adjusted_score": adjusted_score,
        "sentiment_score": round(sentiment_score, 2),
        "recognized_entities": [],
        "fact_check_result": fact_check_result if isinstance(fact_check_result, str) else "Fact-checking results found.",
        "source_credibility": source_credibility
    })

if __name__ == "__main__":
    app.run(debug=True)