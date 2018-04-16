from authenticate.evaluate import*
from sklearn.covariance import EllipticEnvelope
import numpy as np
import pickle

from .models import *


class DataCenter:

    def __init__(self):
        print("load kmeans")
        self.kmeans = self.load_kmeans("authenticate/static/kmeans.pkl")

    @classmethod
    def load_kmeans(cls, file_path):
        """
        :param file_path: "authenticate/static/kmeans.pkl"
        :return kmeans: trained sklearn Kmeans model
        """
        with open(file_path, "rb+") as f:
            kmeans = pickle.load(f)
        return kmeans

    @classmethod
    def frontend_map_2_keystroke_str_timevector_str(cls, map: dict) -> (str, str):
        """
        :rtype: (str, str)
        :param map: {"key":[{"time":millsecond, "type":d}, {"time":milsecond, "type":u}..]..}
        :return keystroke_str: "key1, key2, .."
                time_vector_str:"H1, DD12, UD12, H2...,Hn, DDn, UDn"
        """
        timestamp_vector = []
        for key, value in map.items():
            for i in range(len(value)):
                if i % 2 == 0:
                    timestamp_vector.append({'key': key, 'timed': value[i]['time'], 'timeu': value[i+1]['time']})
        timestamp_vector = sorted(timestamp_vector, key=lambda x: x['timed'])
        for i in range(len(timestamp_vector)-1):
            item, item1 = timestamp_vector[i], timestamp_vector[i+1]
            item['H'] = (item['timeu'] - item['timed']) * 1.0 / 1000
            item['DD'] = (item1['timed'] - item['timed']) * 1.0 / 1000
            item['UD'] = (item1['timed'] - item['timeu']) * 1.0 / 1000
            del item['timed']
            del item['timeu']
        item = timestamp_vector[-1]
        item['H'] = (item['timeu'] - item['timed']) * 1.0 / 1000
        del item['timed']
        del item['timeu']

        keystroke_str = ",".join([str(entry['key']) for entry in timestamp_vector])
        time_vector = []
        for entry in timestamp_vector[:-1]:
            time_vector.append(str(entry['H']))
            time_vector.append(str(entry['DD']))
            time_vector.append(str(entry['UD']))
        time_vector.extend([str(timestamp_vector[-1]['H'])]*3)
        time_vector_str = ",".join(time_vector)

        return keystroke_str, time_vector_str

    @classmethod
    def keystroke_str_2_keystroke_vector(cls, keystroke_str: str) -> list:
        """
        :rtype:list
        :param keystroke_str:  "key1, key2, .."
        :return keystroke_vector: [key1, key2, ..]
        """
        keystroke_vector = list(map(lambda x: float(x), keystroke_str.split(",")))
        return keystroke_vector

    @classmethod
    def time_vector_str_2_time_vector(cls, time_vector_str: str) -> list:
        """
        :rtype:list
        :param time_vector_str: "H1, DD12, UD12, H2...,Hn, DDn, UDn"
        :return time_vector: [H1, DD12, UD12, H2...,Hn, DDn, UDn]
        """
        time_vector = list(map(lambda x: float(x), time_vector_str.split(",")))
        return time_vector

    @classmethod
    def split_time_vector(cls, time_vector: list, n_split: int = 3) -> np.ndarray:
        """
        split time_vector every n_split(typical 3) time_stamp in order to be labeled by kmeans
        :rtype: np.ndarray
        :param time_vector: [H1, DD12, UD12, H2...,Hn, DDn, UDn]
        :param n_split: number of split
        :return: np.array([[H1, DD12, UD12], ...])
        """
        # print(time_vector)
        time_vector_splited = np.array(time_vector)
        time_vector_splited = np.array(np.split(time_vector_splited, len(time_vector_splited)/n_split, axis=0))
        return time_vector_splited

    @classmethod
    def get_time_mat(cls, user: User) -> np.ndarray:
        """
        get the time_vector matrix of User user
        :rtype: np.ndarray
        :param user: the User object to be trained
        :return time_mat: np.array([[H1, DD12, UD12, ...], ....])
        """
        keystroke_set = user.keystroke_set.all()
        time_mat = []
        for keystroke in keystroke_set:
            time_mat.append(cls.time_vector_str_2_time_vector(keystroke.time_vector))
        time_mat = np.array(time_mat)
        return time_mat

    @classmethod
    def get_time_mat_splited(cls, user: User) -> np.ndarray:
        """
        split every vector in time_mat
        :param user: User to be trained
        :return: np.array([[[H1, DD12, UD12], ...],...])
        """
        time_mat = cls.get_time_mat(user)
        time_mat_splited = np.array(
                                list(
                                    map(
                                        lambda time_vector: cls.split_time_vector(time_vector),
                                        time_mat)))
        return time_mat_splited

    def get_time_vector_labeled(self, time_vector_splited: np.ndarray)->list:
        """
        label time_vector via kmeans
        :rtype: list
        :param time_vector_splited: [[H1, DD12, UD12], ...]
        :return time_vector_labeled: [label1, label2, ...]
        """
        length = len(time_vector_splited)
        time_vector_labeled = [self.kmeans.predict([time_vector_splited[i]])[0] for i in range(length)]
        return time_vector_labeled

    def get_time_mat_labeled(self, user: User)->np.ndarray:
        """
        label time_mat via kmeans
        :rtype: np.ndarray
        :param user: User to be trained
        :return time_mat_labeled: np.array([[label1, ...], ...])
        """
        time_mat_splited = self.get_time_mat_splited(user)
        time_mat_labeled = np.array(
                                list(
                                    map(
                                        lambda time_vector_splited: self.get_time_vector_labeled(time_vector_splited),
                                        time_mat_splited)))
        return time_mat_labeled


def generate_keystroke(mp):
    timestamp_vector = []
    for key, value in mp.items():
        for i in range(len(value)):
            if i % 2 == 0:
                timestamp_vector.append({'key':key, 'timed':value[i]['time'], 'timeu':value[i+1]['time']})
    timestamp_vector = sorted(timestamp_vector, key=lambda x: x['timed'])
    for i in range(len(timestamp_vector)-1):
        item, item1 = timestamp_vector[i], timestamp_vector[i+1]
        item['H'] = (item['timeu'] - item['timed']) * 1.0 / 1000
        item['DD'] = (item1['timed'] - item['timed']) * 1.0 / 1000
        item['UD'] = (item1['timed'] - item['timeu']) * 1.0 / 1000
        del item['timed']
        del item['timeu']
    item = timestamp_vector[-1]
    item['H'] = (item['timeu'] - item['timed']) * 1.0 / 1000
    del item['timed']
    del item['timeu']

    keystroke = ",".join([str(entry['key']) for entry in timestamp_vector])

    time_vector_tmp = []
    for entry in timestamp_vector[:-1]:
        time_vector_tmp.append(str(entry['H']))
        time_vector_tmp.append(str(entry['DD']))
        time_vector_tmp.append(str(entry['UD']))
    time_vector_tmp.extend([str(timestamp_vector[-1]['H'])]*3)
    time_vector = ",".join(time_vector_tmp)

    return keystroke, time_vector


def parse_keystroke(keystroke):
    return list(map(lambda x: float(x), keystroke.split(",")))


def get_time_vectors(user):
    keystroke_set = user.keystroke_set.all()
    time_mat = []
    for keystroke_obj in keystroke_set:
        time_mat.append(parse_time_vector(keystroke_obj.time_vector))
    return time_mat


def parse_time_vector(time_vector):
    time_vector = np.array(parse_keystroke(time_vector))
    return np.array(np.split(time_vector, len(time_vector)/3, axis=0))


def load_kmeans(file_path):
    with open(file_path, "rb+") as f:
        kmeans = pickle.load(f)
    return kmeans


def train(user, kmeans):
    keystroke = parse_keystroke(user.keystroke_set.all()[0].keystroke)
    time_mat = get_time_vectors(user)
    # kmeans = load_kmeans("authenticate/static/kmeans.pkl")
    model = generate_HMM(time_mat, 0, len(time_mat), len(keystroke), kmeans)
    return model


def predict(time_vector, hmm_model, kmeans):
    time_vector = parse_time_vector(time_vector)
    time_vector = [kmeans.predict([time_vector[i]])[0] for i in range(len(time_vector))]
    return hmm_model.score([time_vector])


def hmm_authenticate(user, time_vector):
    kmeans = load_kmeans("authenticate/static/kmeans.pkl")
    model = train(user, kmeans)
    clf = EllipticEnvelope()

