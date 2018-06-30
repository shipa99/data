from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

def z_scaler(feature):
	feature = feature.values.tolist()
	f_avg = np.average(feature)
	sum = 0
	m = len(feature)
	for i in range(m):
		sum += ((feature[i] - f_avg) ** 2 / (m - 1))
	sigma = np.sqrt(sum)
	z = [(f_i - f_avg)/sigma for f_i in feature]
	return z

if __name__ == '__main__':
	boston = load_boston()
	data = pd.DataFrame(data=boston.data, columns=boston.feature_names)
	data['MEDV'] = boston.target
	data = data[data['MEDV'] != 50]
	X = data[["RM"]]
	y = data["MEDV"]
	x_scaled = z_scaler(X)
	y_scaled = z_scaler(y)
	print(x_scaled)
