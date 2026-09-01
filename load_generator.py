import requests
import time
import json
import random
import logging
from datetime import datetime

# Config
BASE_URL = 'http://localhost:3000' # Change to your actual backend URL
PROPERTIES_URL = f'{BASE_URL}/api/properties'
LEADS_URL = f'{BASE_URL}/api/leads'

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)

def generate_property():
    return {
        'title': f'Property {random.randint(1, 10000)}',
        'price': random.uniform(100000, 1000000),
        'location': {'lat': random.uniform(-90, 90), 'lng': random.uniform(-180, 180)}
    }

def generate_lead():
    return {
        'name': f'User {random.randint(1, 10000)}',
        'email': f'user{random.randint(1, 10000)}@example.com',
        'budget': random.uniform(50000, 500000)
    }

def stress_test():
    logger.info('Starting load generation...')
    while True:
        # Bombard Properties
        try:
            start = time.time()
            requests.post(PROPERTIES_URL, json=generate_property())
            latency = (time.time() - start) * 1000
            logger.info(f'POST /api/properties | Latency: {latency:.2f}ms')
        except Exception as e:
            logger.error(f'POST /api/properties failed: {e}')

        # Bombard Leads
        try:
            start = time.time()
            requests.post(LEADS_URL, json=generate_lead())
            latency = (time.time() - start) * 1000
            logger.info(f'POST /api/leads | Latency: {latency:.2f}ms')
        except Exception as e:
            logger.error(f'POST /api/leads failed: {e}')

        time.sleep(0.1) # Frequency control

if __name__ == '__main__':
    stress_test()
