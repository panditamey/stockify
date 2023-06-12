# import yfinance as yf

# msft = yf.Ticker("^NSEI")

# # get stock info
# print(msft.info)

# # get historical market data
# hist = msft.history(period="5d")

from flask import Flask, request, jsonify
import yfinance as yf
from datetime import datetime
import pandas as pd
from prophet import Prophet

app = Flask(__name__)

@app.route('/stock_data', methods=['POST'])
def get_stock_data():
    data = request.get_json()
    stock_symbol = data['stock_symbol']
    
    print(str(stock_symbol))

    try:
        # data = yf.download(stock_symbol, start="2015-01-01", end=datetime.now().strftime("%Y-%m-%d"))
        # # info = data.info.to_dict()
        # # data = data[["Date","Close"]]
        # print(data)
        data = yf.download("ICICIBANK.BO", start="2015-01-01", end=datetime.now().strftime("%Y-%m-%d"))
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
        period = 2 * 365

        m = Prophet()
        m.fit(df)
        future = m.make_future_dataframe(periods=period)
        forecast = m.predict(future)
        print(forecast)

        # print(date,data) 
        # frames = [date, data]
        # history = pd.concat(frames)
        # print()
        # date = date.to_dict()
        # df = pd.DataFrame(forecast)
        forecast['ds'] = forecast['ds'].astype(str)

        data = forecast.to_json(orient='records')

        response = {
            'data':data,
            'success':1
        }
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)

if __name__ == '__main__':
    app.run()
    # app.run(debug=False,host="0.0.0.0",port=5000)
