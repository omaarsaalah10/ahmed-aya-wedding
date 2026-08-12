import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "./config";


export async function getWedding(slug) {

  const weddingRef = doc(db, "weddings", slug);

  const weddingSnap = await getDoc(weddingRef);


  if (!weddingSnap.exists()) {
    return null;
  }


  return {
    id: weddingSnap.id,
    ...weddingSnap.data(),
  };

}



export async function addWish({
  weddingId,
  name,
  message
}) {

  await addDoc(
    collection(db, "wishes"),
    {
      weddingId,
      name,
      message,
      createdAt: serverTimestamp(),
    }
  );

}



export async function getWishes(weddingId) {

  const q = query(
    collection(db, "wishes"),
    where(
      "weddingId",
      "==",
      weddingId
    ),
    orderBy(
      "createdAt",
      "desc"
    )
  );


  const snapshot = await getDocs(q);


  return snapshot.docs.map((item)=>({

    id:item.id,

    ...item.data()

  }));

}