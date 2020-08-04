import * as React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons, Feather } from "@expo/vector-icons";
import moment from "moment";

import NeomorphicButton from "../components/NeomorphicButton";
import NeomorphicView from "../components/NeomorphicView";
import { withFirebaseHOC } from "../config/Firebase";

import DefaultUserImg from "../assets/images/DefaultUserAlt.jpg";
import AnonymousImg from "../assets/images/annonymous.jpeg";

const NewButton = ({ onPress, type }) => {
  if (type === "user") {
    return (
      <NeomorphicButton
        onPress={onPress}
        style={{ marginTop: 20 }}
        height={50}
        width={50}
      >
        <View style={styles.buttonBackground}>
          <Feather name="user" size={20} color="#F8A700" />
        </View>
      </NeomorphicButton>
    );
  } else if (type === "event") {
    return (
      <NeomorphicButton
        onPress={onPress}
        style={{ marginTop: "auto" }}
        height={50}
        width={50}
      >
        <View style={styles.buttonBackground}>
          <Ionicons name="ios-add" size={30} color="#F8A700" />
        </View>
      </NeomorphicButton>
    );
  }
};

const CustomCallout = (marker) => {
  return (
    <Callout tooltip={true}>
      <View style={styles.calloutView}>
        <Text style={styles.title}>{marker.title}</Text>
        <Text style={styles.date}>{marker.date}</Text>
      </View>
    </Callout>
  );
};

const CustomMarker = (marker) => {
  return (
    <Marker {...marker}>
      <NeomorphicView height={50} width={50}>
        <Image
          source={marker.imageURL}
          style={{ height: 50, width: 50, borderRadius: 25 }}
        />
      </NeomorphicView>
      <CustomCallout {...marker} />
    </Marker>
  );
};

const AlertMapView = ({ navigation, firebase, ...props }) => {
  const [state, setState] = React.useState({
    uid: "",
    markers: [],
    searched: false,
  });
  const [mapRegion, setMapRegion] = React.useState({
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const [mounted, setMounted] = React.useState(false);
  const mapRef = React.createRef();

  React.useEffect(() => {
    getLocationAsync();
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!state.searched) getEventsAsync();
  }, [state]);

  React.useEffect(() => {
    if (mounted) getEventsAsync();
  }, [navigation]);

  const getPostTime = (then) => {
    let now = new Date();
    let diff = moment(now, "DD/MM/YYYY").diff(moment(then, "DD/MM/YYYY"));
    let duration = moment.duration(diff);
    if (duration.years() > 0) {
      if (duration.years() == 1) return "há mais de um ano";
      else return "há mais de " + duration.years() + " anos";
    } else if (duration.months() > 0) {
      if (duration.months() == 1) return "há mais de um mês";
      else return "há mais de " + duration.months() + " meses";
    } else if (duration.days() > 0) {
      if (duration.days() == 1) {
        if (duration.hours() > 0)
          return (
            "há " + duration.days() + " dias e " + duration.hours() + " horas"
          );
        else return "há um dia";
      }
      return "há " + duration.years() + " dias";
    } else if (duration.hours() > 0) {
      if (duration.minutes() > 10) return "há " + duration.hours() + " horas";
      else
        return "há " + duration.hours() + " h " + duration.minutes() + " min";
    } else if (duration.minutes() > 0) {
      return "há " + duration.minutes() + " minutos";
    } else {
      return "há " + duration.seconds() + " segundos";
    }
  };

  const getEventsLocation = async (_) => {
    try {
      const QuerySnapshot = await firebase.FIREBASE.firestore()
        .collection("ALERT")
        .where("deleted", "==", false)
        .limit(20)
        .get();

      const authors = {};

      const documents = await Promise.all(
        QuerySnapshot.docs // Array QueryDocumentSnapshot
          .map(async (document) => {
            const alert = document.data();
            let userImg, userNick;
            if (alert.anonymous) {
              userImg = AnonymousImg;
              userNick = "Anônimo";
            } else {
              let author = await getAuthor(authors, alert.autor);
              try {
                userImg = {
                  uri: await firebase.FIREBASE.storage()
                    .ref(`ProfileImg/${alert.autor}.jpg`)
                    .getDownloadURL(),
                };
              } catch (e) {
                userImg = DefaultUserImg;
              }
              userNick = author || "Nickname";
            }
            return {
              _id: alert.content,
              user: {
                name: userNick,
                img: userImg,
              },
              title: alert.subject || "",
              date: getPostTime(alert.created_at.toDate()),
              labels: ["assalto", "animal louco", "iluminação"],
              coordinate: alert.location,
              content: alert.content || "",
              upvotes: alert.upvotes,
            };
          })
      );

      return documents;
    } catch (e) {
      throw e;
    }
  };

  const getAuthor = async (AuthorsDict, userID) => {
    if (userID in AuthorsDict) {
      console.log("ja consultei esse aqui :)");
      return AuthorsDict[userID];
    } else
      try {
        let newUser = await firebase.FIREBASE.firestore()
          .collection("USER")
          .doc(userID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let user = doc.data();
              return user.nickname;
            } else {
              // * error / not found *
            }
          });

        AuthorsDict[userID] = newUser;

        return newUser;
      } catch (e) {
        // console.log(userID);
        console.log(e.message);
      }
  };

  const getEventsAsync = async () => {
    try {
      const markers = await getEventsLocation();
      markers.forEach((marker) => {
        marker.imageURL = marker.user.img;
      });

      console.log("foi");
      setState({ ...state, markers, searched: true });
    } catch (err) {
      console.log(err);
    }
  };

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      alert("Location not allowed");
      return;
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const { longitude, latitude } = coords;

    setMapRegion({ ...mapRegion, longitude, latitude });
  };

  const handleMapRegionChange = (mapRegion) => {
    setMapRegion(mapRegion);
  };

  return mapRegion.latitude ? (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        region={mapRegion}
        onRegionChangeComplete={handleMapRegionChange}
        showsUserLocation={true}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        {state.markers &&
          state.markers.map((marker) => (
            <CustomMarker key={marker._id} {...marker} />
          ))}
      </MapView>
      <View style={styles.buttonsContainer}>
        <NewButton onPress={() => navigation.navigate("Profile")} type="user" />
        <NewButton
          onPress={() => navigation.navigate("NewEvent", mapRegion)}
          type="event"
        />
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default withFirebaseHOC(AlertMapView);

mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const styles = StyleSheet.create({
  map: {},
  buttonsContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    padding: 20,
  },
  buttonBackground: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#282828",
    justifyContent: "center",
    alignItems: "center",
  },
  calloutView: {
    backgroundColor: "#282828",
    width: 150,
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#F8A700",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: "auto",
    marginTop: 10,
  },
});
