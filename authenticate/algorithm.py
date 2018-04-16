import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from functools import reduce
from hmmlearn import hmm
from sklearn.metrics import roc_curve, auc
from sklearn.covariance import EllipticEnvelope
from sklearn import svm
from abc import ABC, abstractmethod

from .data_center import*
from .models import *


class Algorithm(ABC):

    def __index__(self):
        pass

    @abstractmethod
    def train(self, user: User):
        """
        abstract method, train model for user
        :param user: User to be trained
        """

    @abstractmethod
    def predict(self, user: User, time_vector_str: str):
        """
        abstract method, predict time_vector_str of user
        :param user: User
        :param time_vector_str: Keystroke.time_vector, "H1, DD12, UD12, ..."
        """


class HmmAlgorithm(Algorithm):
    __data_center = DataCenter()

    def __init__(self):
        super(HmmAlgorithm, self).__init__()
        self.__length = None  # length of keystroke
        self.__model = None   # HMM model
        self.__clf = None     # classfier of Hmm
        self.__n_clusters = len(self.__data_center.kmeans.cluster_centers_)  # number of observe states

    def __generate_trans_pi(self):
        """init Pi vector (initial prob for every hiden state) """
        trans_pi = np.array([1] + [0 for i in range(self.__length - 1)])
        return trans_pi

    def __generate_trans_a(self):
        """transation matrix A  (prob of transation for every hiden state to each other)"""
        trans_a = np.zeros((self.__length, self.__length))
        for i in range(self.__length - 1):
            trans_a[i][i + 1] = 1
        trans_a[self.__length - 1][self.__length - 1] = 1
        return trans_a

    def __generate_trans_b(self, time_mat_labeled):
        """transation B matrix"""
        trans_b = np.zeros((self.__length, self.__n_clusters))
        for i in range(self.__length):
            mp = {}
            for time_vector_labeled in time_mat_labeled:
                c = time_vector_labeled[i]
                mp[c] = mp.get(c, 0) + 1
            for j in range(self.__n_clusters):
                trans_b[i][j] = (1 + mp.get(j, 0) * 1.0) / (len(time_mat_labeled) + self.__n_clusters)
        return trans_b

    def __generate_model(self, user: User):
        """init hmm model"""
        time_mat_labeled = self.__data_center.get_time_mat_labeled(user)
        self.__model = hmm.MultinomialHMM(n_components=self.__length)
        self.__model.startprob_ = self.__generate_trans_pi()
        self.__model.transmat_ = self.__generate_trans_a()
        self.__model.emissionprob_ = self.__generate_trans_b(time_mat_labeled)

    def __score_time_vector_labeled(self, time_vector_labeled):
        score = self.__model.score([time_vector_labeled])
        return score

    def __score_time_mat_labeled(self, time_mat_labeled):
        score_vectors = list(map(
                            lambda time_vector_labeled: self.__score_time_vector_labeled(time_vector_labeled),
                            time_mat_labeled))
        return score_vectors

    def __get_keystroke_length(self, user):
        keystroke_str = user.keystroke_set.all()[0].keystroke
        keystroke_vector = self.__data_center.keystroke_str_2_keystroke_vector(keystroke_str)
        return len(keystroke_vector)

    def train(self, user: User):
        """train hmm model for user"""
        # must init __length before model
        self.__length = self.__get_keystroke_length(user)
        self.__generate_model(user)

        time_mat_labeled = self.__data_center.get_time_mat_labeled(user)
        score_vectors = self.__score_time_mat_labeled(time_mat_labeled)
        score_vectors = np.array(score_vectors).reshape(-1, 1)

        # use EllipticEnvelope or OneclassSVM to classify
        try:
            self.__clf = EllipticEnvelope()
            self.__clf.fit(score_vectors)
        except Exception as e:
            self.__clf = svm.OneClassSVM(nu=0.1, kernel="rbf")
            self.__clf.fit(score_vectors)
        finally:
            # debug
            print(self.__clf.predict(score_vectors))

    def predict(self, user: User, time_vector_str: str):
        """predict whether time_vector of user is genuie to trained user"""
        if self.__model is None or self.__clf is None:
            self.train(user)
        time_vector = self.__data_center.time_vector_str_2_time_vector(time_vector_str)
        time_vector_splited = self.__data_center.split_time_vector(time_vector)
        time_vector_labeled = self.__data_center.get_time_vector_labeled(time_vector_splited)
        score = self.__score_time_vector_labeled(time_vector_labeled)
        ans = self.__clf.predict(score)[0]

        # debug
        print(score)
        print(ans)

        ans = int(ans)
        if ans == 1:
            return True
        elif ans == -1:
            return False

