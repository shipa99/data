from sklearn.datasets import load_iris
import random 
import numpy as np
import math
from math import fsum
from math import sqrt
import pandas as pd

class KMeans:
    
    def __init__(self, n_clusters, n_iter):
        self.n_clusters = n_clusters
        self.n_iter = n_iter

    def dist(p, q, fsum=fsum, sqrt=sqrt, zip=zip):
        return sqrt(fsum([(x - y)**2 for x, y in zip(p, q)]))

    def mean(data):
        data = list(data)
        return fsum(data) / len(data)

    def fit(self, X):

        m = len(X)
        rand_int = random.sample([_ for _ in range(m)], self.n_clusters)
        centroids, centroids_prev = [], []
        for i in range(self.n_clusters):
            centroids.append(X[rand_int[i]])

        #Распределяем точки по кластерам 
        for i in range(self.n_iter):
            distance = []
            clusters = []
            for i in range(self.n_clusters):
                clusters.append([])
            
            for i in range(m):
                distance.append([])
                for j in range(self.n_clusters):
                    dist_ = self.dist(X[i], centroids[j])
                    distance[i].append(dist_)
                    min_ = distance[i].index(min(distance[i]))
                clusters[min_].append(X[i])

            #Обновляем центроиды
            centroids_prev = centroids
            centroids = [tuple(map(mean, zip(*cluster))) for cluster in clusters]
            self.centroids = centroids

        return self.centroids

    def predict(self, y):
        m = len(y)
        
        distance = []
        clusters = []
        for i in range(self.n_clusters):
            clusters.append([])
            
        for i in range(m):
            distance.append([])
            for j in range(self.n_clusters):
                dist_ = dist(y[i], self.centroids[j])
                distance[i].append(dist_)
                min_ = distance[i].index(min(distance[i]))
            clusters[min_].append(y[i])
        
        dict_clusters = {}
        for i in range(self.n_clusters):
            dict_clusters[self.centroids[i]] = clusters[i]

        self.clusters = dict_clusters
        return self.clusters

if __name__ == '__main__':
    iris = load_iris()
    data = iris.data
    model = KMeans(3, 50)
    model.fit(data)
    clusters = model.predict(data)
    print(clusters)