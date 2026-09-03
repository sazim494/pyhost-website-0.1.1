import os
import hmac
import hashlib
import json
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

AGENT_UUID = os.environ.get('AGENT_UUID', 'agent-local-001')
AGENT_SECRET = os.environ.get('AGENT_SECRET', 'super-secret-example')

def verify_hmac(headers, body_bytes):
    # Expect headers: X-Agent-ID, X-Timestamp, X-Request-ID, X-Signature
    agent_id = headers.get('X-Agent-ID')
    ts = headers.get('X-Timestamp')
    reqid = headers.get('X-Request-ID')
    signature = headers.get('X-Signature')
    if not (agent_id and ts and reqid and signature):
        return False
    msg = f"{request.method}|{request.path}|{ts}|{hashlib.sha256(body_bytes).hexdigest()}"
    expected = hmac.new(AGENT_SECRET.encode('utf-8'), msg.encode('utf-8'), hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.route('/agent/v1/heartbeat', methods=['POST'])
def heartbeat():
    body = request.get_data() or b''
    if not verify_hmac(request.headers, body):
        return jsonify({'message':'unauthorized'}), 401
    payload = request.get_json() or {}
    # Here agent reports capacity and running projects
    return jsonify({'status':'ok','agent_uuid':AGENT_UUID})

@app.route('/agent/v1/projects/<int:project_id>/deploy', methods=['POST'])
def deploy(project_id):
    body = request.get_data() or b''
    if not verify_hmac(request.headers, body):
        return jsonify({'message':'unauthorized'}), 401
    data = request.get_json() or {}
    # In a real agent: download artifact_url, extract, run container/process
    # For prototype return accepted
    return jsonify({'message': 'deploy accepted', 'project_id': project_id}), 200

@app.route('/agent/v1/projects/<int:project_id>/start', methods=['POST'])
def start(project_id):
    body = request.get_data() or b''
    if not verify_hmac(request.headers, body):
        return jsonify({'message':'unauthorized'}), 401
    # Start logic
    return jsonify({'message':'start accepted', 'project_id': project_id}), 200

@app.route('/agent/v1/projects/<int:project_id>/stop', methods=['POST'])
def stop(project_id):
    body = request.get_data() or b''
    if not verify_hmac(request.headers, body):
        return jsonify({'message':'unauthorized'}), 401
    # Stop logic
    return jsonify({'message':'stop accepted', 'project_id': project_id}), 200

@app.route('/agent/v1/projects/<int:project_id>/status', methods=['GET'])
def status(project_id):
    # Status may be requested by control plane (signed)
    if not verify_hmac(request.headers, b''):
        return jsonify({'message':'unauthorized'}), 401
    # Sample runtime info
    return jsonify({
        'status': 'running',
        'pid': 1234,
        'uptime_seconds': 3600,
        'memory_mb': 64,
        'cpu_percent': 2.5
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
