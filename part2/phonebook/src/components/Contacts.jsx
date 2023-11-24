import personService from '../services/persons'

const Contacts = (props) => {
 // const deleteContact = (event) => {
  //  personService.deletePerson(person.id)
 // }

  return (
    <div>
      {props.person.name} {props.person.number} <button className={props.person.name} id={props.person.id} onClick={props.handleDelete}>delete</button>
    </div>
  )
}

export default Contacts