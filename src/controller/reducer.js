export function ReducerMain(state = {}, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        SingleObject(undefined, action)
      ]
    case 'DELETE':
      return state.filter(({ id }) => id !== action.data);
    case 'ARCHIVE':
      return [...state.map(t => SingleObject(t, action))];
    case 'SAVE':
      return [...state.filter(({ id }) => id !== action.data.id), action.data];
    case 'DEFAULT':
      return action.data;
    default:
      return state;
  }
}

function SingleObject(state, action) {
  switch(action.type){
    case 'ADD':
      return {
        'archived': action.data.archived,
        'title': action.data.title,
        'list': action.data.list.map((li) => { return {
          'listValue': li.listValue,
          'isChecked': li.isChecked
        }}),
        'lastModified': action.data.lastModified,
        'id': action.data.id
      }
    case 'ARCHIVE':
      if (state.id !== action.data) {
        return state;
      }
      return Object.assign(
        {},
        state,
        { archived: !state.archived }
      )
    case 'SAVE':
      return state.id;
    default:
      return state;
  }
}