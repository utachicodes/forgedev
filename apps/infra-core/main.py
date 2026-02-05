from flask import Flask, jsonify
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'infra-core',
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    })

@app.route('/metrics', methods=['GET'])
def get_metrics():
    """Infrastructure metrics endpoint (placeholder)"""
    return jsonify({
        'cpu_usage': 0.0,
        'memory_usage': 0.0,
        'disk_usage': 0.0,
        'uptime': 0,
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    })

if __name__ == '__main__':
    port = int(os.getenv('PORT', 8080))
    print(f'[Infra] Server running on port {port}')
    app.run(host='0.0.0.0', port=port, debug=True)
