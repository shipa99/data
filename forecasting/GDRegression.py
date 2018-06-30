from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
from normalize import z_scaler

class GDRegressor:
	
	def __init__(self, alpha=0.01, n_iter=100):
		self.alpha = alpha
		self.n_iter = n_iter

	def fit(self, X_train, y_train):
		if type(X_train) == list:
			pass
		else:
			X_train = X_train.values.tolist()
			
		if type(y_train) == list:
			pass
		else:
			y_train = y_train.values.tolist()

		X_matrix = []
		for i in range(len(X_train)):
			X_train[i].insert(0, 1)
			X_matrix.append(X_train[i])
		X_as_matrix = np.asmatrix(X_matrix)

		y_matrix = []
		for i in range(len(y_train)):
			y_matrix.append([y_train[i]])

		m = len(y_train)
		self.theta = np.zeros((len(X_matrix[0]), 1))

		for i in range(self.n_iter):
			self.theta = self.theta - self.alpha * (1 / m) * (np.matmul(X_as_matrix.T, 
				(np.matmul(X_matrix, self.theta) - y_matrix)))

		theta_list = np.matrix.tolist(self.theta)
		self.coef_ = theta_list[1:]
		self.intercept_ = theta_list[0]
		return theta_list

	def predict(self, X_test):
		if type(X_test) == list:
			pass
		else:
			X_test = X_test.values.tolist()
		X_matrix_test = []
		for i in range(len(X_test)):
			X_test[i].insert(0, 1)
			X_matrix_test.append(X_test[i])
		answers = np.matmul(X_matrix_test, self.theta)
		return answers

if __name__ == '__main__':
	boston = load_boston()
	data = pd.DataFrame(data=boston.data, columns=boston.feature_names)
	data['MEDV'] = boston.target
	data = data[data['MEDV'] != 50]
	X = data[["RM"]]
	y = data["MEDV"]
#	X = z_scaler(X)
#	y = z_scaler(y)
	X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=18)
	model = GDRegressor(alpha=0.03, n_iter=4350)
	model.fit(X_train, y_train)
	answers = model.predict(X_test)
	print(answers)