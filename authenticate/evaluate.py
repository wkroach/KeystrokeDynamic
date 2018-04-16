import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from functools import reduce
from hmmlearn import hmm
from sklearn.metrics import roc_curve, auc


def generate_HMM(mat, start_line, end_line, password_length, kmeans):
    # number of clusters in kmeans
    n_clusters = len(kmeans.cluster_centers_)
    # init Pi vector (initial prob for every hiden state)
    trans_Pi = np.array([1] + [0 for i in range(password_length - 1)])

    # transation A matrix (prob of transation for every hiden state to each other)
    trans_A = np.zeros((password_length, password_length))
    for i in range(password_length - 1):
        trans_A[i][i + 1] = 1
    trans_A[password_length - 1][password_length - 1] = 1

    # transation B matrix
    trans_B = np.zeros((password_length, n_clusters))
    for j in range(password_length):
        mp = {}
        for i in range(start_line, end_line):
            c = kmeans.predict([mat[i][j]])[0]
            mp[c] = mp.get(c, 0) + 1
        for i in range(n_clusters):
            trans_B[j][i] = (1 + mp.get(i, 0) * 1.0) / (end_line - start_line + n_clusters)

    # generate HMM model for subject
    model = hmm.MultinomialHMM(n_components=password_length)
    model.startprob_ = trans_Pi
    model.transmat_ = trans_A
    model.emissionprob_ = trans_B

    return model


def generate_user_scores(mat, start_line, end_line, password_length, kmeans, hmm_model):
    user_vector = [np.array([kmeans.predict([mat[j][i]])[0] for i in range(password_length)]) for j in
                   range(start_line, end_line)]
    user_scores = list(map(lambda vector: hmm_model.score([vector]), user_vector))
    return user_scores


def generate_imposter_scores(subject, start_line, end_line, password_length, df_arr, kmeans, hmm_model):
    imposter_vectors = [[np.array([kmeans.predict([df_arr[key][j][i]])[0] for i in range(password_length)]) for j in
                         range(start_line, end_line)] for key in df_arr.keys() - set([subject])]
    imposter_vector = reduce(lambda x, y: x + y, imposter_vectors)
    imposter_scores = list(map(lambda vector: hmm_model.score([vector]), imposter_vector))
    return imposter_scores


def cal_roc(user_scores, imposter_scores):
    labels = [1] * len(user_scores) + [0] * len(imposter_scores)
    fpr, tpr, thresh_hold = roc_curve(labels, user_scores + imposter_scores)
    return fpr, tpr


def equal_error_rate(fpr, tpr):
    fnr = 1 - tpr
    dist = fnr - fpr
    idx1 = np.argmin(dist[dist >= 0])
    idx0 = np.argmax(dist[dist < 0])
    x = [fnr[idx1], fpr[idx1]]
    y = [fnr[idx0], fpr[idx0]]
    a = (x[0] - x[1]) / (y[1] - x[1] - y[0] + x[0])
    eer = x[0] + a * (y[0] - x[0])
    return eer


def plot_roc(subject, fpr, tpr, save_fig=False, plot=True):
    lw = 2
    plt.plot(fpr, tpr,
             lw=lw, label='%s (auc = %0.2f eer = %0.3f)' % (subject, auc(fpr, tpr), equal_error_rate(fpr, tpr)))
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve of %s' % subject)
    plt.legend(loc="lower right")
    if save_fig:
        plt.savefig('ROC_photos/%s.png' % subject, format='png', dpi=300)
        plt.clf()
    if plot:
        plt.show()


def _evaluate(args):
    subject, password_length, df_arr, kmeans, save_fig, plot = args

    model = generate_HMM(df_arr[subject], 0, 200, 11, kmeans)
    user_scores = generate_user_scores(df_arr[subject], 200, 400, 11, kmeans, model)
    imposter_scores = generate_imposter_scores(subject, 0, 5, 11, df_arr, kmeans, model)
    fpr, tpr = cal_roc(user_scores, imposter_scores)
    plot_roc(subject, fpr, tpr, save_fig, plot)

    print("%s finish" % (subject))
    return equal_error_rate(fpr, tpr)
