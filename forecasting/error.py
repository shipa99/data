from GDRegression import GDRegressor
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

def rmse(y_hat, y):
	""" Root mean squared error """
	if type(y) == list:
		pass
	else:
		y = y.values.tolist()
	m = len(y)
	sum = 0
	for i in range(m):
		sum += ((y_hat[i] - y[i]) ** 2 / m)
	error = np.sqrt(sum)
	return error

def r_squared(y_hat, y):
	""" R-squared score """
	if type(y) == list:
		pass
	else:
		y = y.values.tolist()
	m = len(y)
	y_avg = np.average(y)
	
	a = b = 0
	for i in range(m):
		a += (y[i] - y_hat[i]) ** 2
		b += (y[i] - y_avg) ** 2
	error = 1 - a/b
	return error

if __name__ == '__main__':
	boston = load_boston()
	data = pd.DataFrame(data=boston.data, columns=boston.feature_names)
	data['MEDV'] = boston.target
	data = data[data['MEDV'] != 50]
	X = data[["RM"]]
	y = data["MEDV"]
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=18)
	model = GDRegressor(alpha=0.03, n_iter=4350)
	model.fit(X_train, y_train)
	answers = model.predict(X_test)
	rmse = rmse(answers, y_test)
	r_squared = r_squared(answers, y_test)
	print(rmse)
	print(r_squared)
