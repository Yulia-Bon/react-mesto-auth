import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
                <img className="profile__avatar" alt="Аватар" src={currentUser.avatar}/>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__job">{currentUser.about}</p>
                    <button className="profile__edit" type="button" aria-label="кнопка изменения профиля"
                            onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить фото"
                        onClick={props.onAddPlace}></button>
            </section>

            <section className="places">
                <ul className="photo-grid">
                    {props.cards.map((card) => {
                        return (
                            <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteClick={props.onCardDeleteClick}/>
                        )
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;