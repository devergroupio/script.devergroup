from flask import Flask, request, jsonify, json, Response
from langdetect import detect
from wtforms import Form, StringField, validators


class DetectForm(Form):
    text = StringField('Text To Detect', [validators.Length(min=10)])


app = Flask(__name__)
@app.route("/detect", methods=["POST"])
def detectLang():
    form = DetectForm(request.form)
    if(request.method == 'POST' and form.validate()):

        detectLang = detect(form.text.data)

        return jsonify(status='success', message=detectLang)
    return jsonify(
        status='error',
        message=form.errors
    )


app.run(debug=False, host='0.0.0.0')
