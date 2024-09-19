import { db } from '@/firebase/config'
import { FirebaseError } from 'firebase/app'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export async function createUser(userId: string, username: string) {
  try {
    //NOTE: Comprobar si el usuario existe
    const usersDocRef = doc(db, 'users', userId)
    const userSnapshot = await getDoc(usersDocRef)

    //NOTE: Si no existe se guarda
    if (!userSnapshot.exists()) {
      await setDoc(usersDocRef, {
        userId: userId,
        userName: username,
        createdAt: new Date(),
        boards: []
      })

      console.log('Usuario guardado correctamente')
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firabase Error', error)
    } else {
      console.error(error)
      throw new Error('Error al crear el usuario')
    }
  }
}
