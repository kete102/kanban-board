import { db } from '@/firebase/config'
import { Board } from '@/types'
import { FirebaseError } from 'firebase/app'
import { addDoc, collection } from 'firebase/firestore'

export async function createBoard(newBoard: Board) {
  try {
    const boardsCollectionRef = collection(db, 'users', 'boards')
    await addDoc(boardsCollectionRef, newBoard)
    console.log('Nuevo tablero creado exitosamente')
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.error('Firabase Error', error)
    } else {
      console.error(error)
      throw new Error('Error al crear la nueva board')
    }
  }
}
export async function deleteBoard() {}
