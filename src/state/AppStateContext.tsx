import { createContext, useContext, Dispatch, FC } from 'react'
import { appStateReducer, AppState, List, Task } from './appStateReducer'
import { Action } from './actions'
import { useImmerReducer } from 'use-immer'

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To do',
      tasks: [
        { id: 'a0', text: 'Eat eggs' },
        { id: 'a1', text: 'Go shopping' },
      ],
    },
    {
      id: '1',
      text: 'In progress',
      tasks: [{ id: 'b0', text: 'Go to cinema' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c0', text: 'Finish homework' }],
    },
  ],
}

type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

interface Props {
  children?: React.ReactNode
}

export const AppStateProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)
  const { lists } = state

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
