import db from "./Firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  doc,
  setDoc,
  startAt,
} from "firebase/firestore";

function getQuery(type, orderByObj, limitValue, whereClauses, startAtIndex) {
  const options = [];
  if (orderByObj) {
    options.push(orderBy(orderByObj.field, orderByObj.direction || "asc"));
  }
  if (limitValue) {
    options.push(limit(limitValue));
  }
  if (whereClauses) {
    whereClauses.forEach((whereClause) => {
      options.push(
        where(whereClause.field, whereClause.operator, whereClause.value)
      );
    });
  }
  if (startAtIndex) {
    options.push(startAt(startAtIndex));
  }
  return query(collection(db, type), ...options);
}

function create(record, type) {
  addDoc(collection(db, type), record);
}

function update(data, type, id) {
  const ref = doc(db, type, id);
  setDoc(ref, data, { merge: true });
}

export { getQuery, create, update };
