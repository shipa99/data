import math
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import datasets
from sklearn.model_selection import train_test_split

class LogisticRegression:
    
    def __init__(self, alpha=0.01, n_iter=1000):
        self.alpha = alpha
        self.n_iter = n_iter

    def fit(self, X_train, y_train):
        if type(X_train) == list:
            pass
        else:
            X_train = X_train.tolist()
            
        if type(y_train) == list:
            pass
        else:
            y_train = y_train.tolist()

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

        self.theta = np.matrix.tolist(self.theta)
        coef_ = self.theta[1:]
        intercept_ = self.theta[0]
        return self.theta

    def predict(self, X_test):
        if type(X_test) == list:
            pass
        else:
            X_test = X_test.tolist()

        X_matrix_test = []
        for i in range(len(X_test)):
            X_test[i].insert(0, 1)
            X_matrix_test.append(X_test[i])
        z = np.matmul(X_matrix_test, self.theta)
        answers = [1 / (1 + math.e**(-z_value)) for z_value in z]
        return answers

if __name__ == '__main__':
    data = datasets.load_iris()
    X = data.data
    y = data.target
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=17)
    model = LogisticRegression(alpha = 0.01, n_iter = 1000)
    model.fit(X_train, y_train)
    answers = model.predict(X_test)
    print(answers)