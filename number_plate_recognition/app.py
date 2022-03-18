from flask import Flask
from flask import request
from flask_ngrok import run_with_ngrok
from flask_cors import CORS

from noplate import nss

app = Flask(__name__)
CORS(app)
run_with_ngrok(app)

@app.route("/")
def home():
	return "<h1>test</h1>"

@app.route('/predict',methods=['GET'])
def predict():
	ip = int(request.args['tes'])
	ip= str(ip)
	print(ip)
	ans = nss(ip)
	return str(ans)
    # print(a)
    # 	print(imgf,c)
    # 	c+=1
  	# return str(a)
	
app.run()