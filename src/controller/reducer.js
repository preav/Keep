export function Operations(state = {}, action) {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        SingleObject(undefined, action)
      ]
    case 'EDIT':
      return state;
    case 'DELETE':
      return state.map(t => SingleObject(t, action))
    case 'ARCHIVE':
      return state.map(t => SingleObject(t, action))
    case 'SAVE':
      return Object.assign([...state, 'save']);
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
        archived: action.archived,
        deleted: action.editable,
        editable: action.editable,
        title: action.title,
        list: action.list.map((li) => { return {
          'listValue': li.listValue,
          'isChecked': li.isChecked
        }}),
        lastModified: action.lastModified,
      }
    case 'EDIT':
      return state.id;
    case 'DELETE':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign(
        {},
        state,
        { deleted: true }
      )
    case 'ARCHIVE':
      if (state.id !== action.id) {
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