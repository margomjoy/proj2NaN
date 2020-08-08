import os
import pandas as pd
from flask import Flask, render_template, jsonify
import sqlalchemy
from sqlalchemy import create_engine
import pymysql

# Heroku check
is_heroku = False
if 'IS_HEROKU' in os.environ:
    is_heroku = True

# Import your config file(s) and variable(s)
if is_heroku == False:
    from config import host, port, username, password, database 
else:
    host = os.environ.get('host')
    port = os.environ.get('port')
    username = os.environ.get('username')
    password = os.environ.get('password')
    database = os.environ.get('database')

pymysql.install_as_MySQLdb()

app = Flask(__name__)
engine = create_engine(f'mysql://{username}:{password}@{host}:{port}/{database}')


@app.route('/')
def index():

    return render_template('index.html')

@app.route('/api/data/monthly_delays')
def monthly_delays():
    conn = engine.connect()
    
    query = '''
	    SELECT * FROM monthly_delays
    '''
    
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')

    conn.close()

    return results_json

@app.route('/api/data/airline_cancellations')
def airline_cancellations():
    conn = engine.connect()
    
    query = '''
	    SELECT * FROM cancellations_by_airline
    '''
    
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')

    conn.close()

    return results_json

@app.route('/api/data/airport_cancellations')
def airport_cancellations():
    conn = engine.connect()
    
    query = '''
	    SELECT * FROM cancellations_by_airport
    '''
    
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')

    conn.close()

    return results_json


# Set up your default route
@app.route('/jan_json')
def json_jan():

    conn = engine.connect()
    
    query1 = '''
        select flight_status 
            ,count(flight_status) as jan_total 
        from nan.january
        group by flight_status
        '''
    
    jan_data = pd.read_sql(query1, con=conn)
    query2 = '''
        select flight_status 
            ,count(flight_status) as may_total 
        from nan.may
        group by flight_status
        '''
    
    may_data = pd.read_sql(query2, con=conn)
    query3 = '''
        select flight_status 
            ,count(flight_status) as july_total 
        from nan.july
        group by flight_status
        '''
    
    july_data = pd.read_sql(query3, con=conn)
    query4='''
        select flight_status 
        ,count(flight_status) as feb_total 
        from nan.february
        group by flight_status
    '''
    february_data=pd.read_sql(query4, con=conn)
    query5='''
        select flight_status 
        ,count(flight_status) as mar_total 
        from nan.march
        group by flight_status
    '''
    march_data=pd.read_sql(query5, con=conn)
    query6='''
        select flight_status 
        ,count(flight_status) as apr_total 
        from nan.april
        group by flight_status
    '''
    april_data=pd.read_sql(query6, con=conn)
    query7='''
        select flight_status 
        ,count(flight_status) as jun_total 
        from nan.june
        group by flight_status
    '''
    june_data=pd.read_sql(query7, con=conn)



    ######################
    first=pd.DataFrame.merge(jan_data, february_data, how="outer")
    second=pd.DataFrame.merge(first,march_data, how="outer")
    third=pd.DataFrame.merge(second,april_data, how="outer")
    fourth=pd.DataFrame.merge(third,may_data, how="outer")
    fifth=pd.DataFrame.merge(fourth,june_data, how="outer")
    final=pd.DataFrame.merge(fifth,july_data, how="outer")

    ######################

    
    jan_json = final.to_json(orient='records')

    conn.close()

    return jan_json

# SRI -- add this to app.py
@app.route('/api/data/monthly_cancellations')
def monthly_cancellations():
    conn = engine.connect()
    
    query = '''
	    SELECT month, SUM(cancellations) AS cancellations FROM cancellations_by_airport GROUP BY month 
    '''
    
    results_df = pd.read_sql(query, con=conn)
    results_json = results_df.to_json(orient='records')

    conn.close()

    return results_json

if __name__ == '__main__':
    app.run(debug=True)