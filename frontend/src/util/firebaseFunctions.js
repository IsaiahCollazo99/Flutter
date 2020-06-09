import firebase from '../firebase';

export const logOut = () => firebase.auth().signOut();

export const logIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const getFirebaseIdToken = () => firebase.auth().currentUser.getIdToken(false);

export const uploadPicture = ( folderPath, data, callback, currentUser ) => {
    const userImg = data.image ? data.image : data;
    let storageRef = firebase.storage().ref(folderPath + userImg.name);
    let upload = storageRef.put(userImg);

    upload.on('state_changed', snapshot => {
    }, error => {
        console.log(error);
        throw error;
    },async () => {
        const image = await upload.snapshot.ref.getDownloadURL();

        data.postBody ? 
            await callback({postBody: data.postBody, tags: data.tags, image}, currentUser) :
            await callback({id: data.id, url: image});
    })
}