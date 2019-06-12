## Hospital Pricing Map

This project creates an interactive map of [hospital chargemaster data](https://github.com/vsoch/hospital-chargemaster), allowing users to compare the cost of different procedures across nearby hospitals.

To use it, simply type in the procedure you're curious about. The map will then query a postgres DB to find the three nearest hospitals and their respective prices. Click anywhere on the map to change the origin of your query location.

Notes: 
- I haven't entered data for all hospitals yet because the data is *very* dirty. There are currently four hospitals in the DB.
- Different hospitals have different names for different procedures (this data is not standardized in any way), so be as specific as possible when searching (e.g. 'delivery' yields poor results, but 'vaginal delivery' is correct across hospitals). 


### TO-DOs

- Add data for all hospitals
- Containerize postgres setup
- Create single docker-compose
- Improve query speed/accuracy

