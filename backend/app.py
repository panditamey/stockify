
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import yfinance as yf
from datetime import datetime
import pandas as pd
from prophet import Prophet
import json
import numpy as np

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/stock_data', methods=['POST'])
@cross_origin()
def get_stock_data():
    data = request.get_json()
    stock_symbol = data['stock_symbol']
    years = data['years']
    period = float(years) * 365
    
    print(str(stock_symbol))

    try:
        # data = yf.download(stock_symbol, start="2015-01-01", end=datetime.now().strftime("%Y-%m-%d"))
        # # info = data.info.to_dict()
        # # data = data[["Date","Close"]]
        # print(data)
        data = yf.download(stock_symbol, start="2015-01-01", end=datetime.now().strftime("%Y-%m-%d"))
        data.to_csv
        df = pd.DataFrame(data=data)
        df.reset_index(inplace=True)
        # print(df.head(1))
        date = df['Date']
        data = (df['High']+df['Low']+df['Open']+df['Close'])/4
        data = {'Date': date,
        'Data': data}
        df = pd.DataFrame(data)
        print(df)
        df = df.rename(columns={"Date": "ds", "Data": "y"})

        m = Prophet()
        m.fit(df)
        future = m.make_future_dataframe(periods=int(period))
        forecast = m.predict(future)
        print(forecast)
        forecast['ds'] = forecast['ds'].astype(str)

        #new code 
        ds = [forecast['ds'].values][0]
        yhat = [forecast['yhat'].values][0]
        trend_lower = [forecast['trend_lower'].values][0]
        trend_upper = [forecast['trend_upper'].values][0]
        dsseries = pd.Series(ds).to_json(orient='values')
        yhatseries = pd.Series(yhat).to_json(orient='values')
        trend_lowerseries = pd.Series(trend_lower).to_json(orient='values')
        trend_upperseries = pd.Series(trend_upper).to_json(orient='values')
        history = json.dumps({
            'dates': dsseries,
            'prices': yhatseries,
            'trend_lower':trend_lowerseries,
            'trend_upper':trend_upperseries
        })
    except Exception as e:
        response = {'error': str(e)}

    return history
    # return jsonify(response)

if __name__ =="__main__":
    app.run(debug=False,host="0.0.0.0",port=5000)
