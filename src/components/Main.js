
import React from "react";
import Card from './Card';
import  api from '../utils/api';

function Main(props) {
    const {onEditProfile, onAddPlace, onEditAvatar, onCardClick} = props;
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo().then((profileInfo) => {
            console.log(profileInfo);
            setUserName(profileInfo.name)
            setUserDescription(profileInfo.about)
            setUserAvatar(profileInfo.avatar)
        })
            .catch((err) => console.log(err))

        api.getInitialCards().then((cards) => {
            console.log(cards);
            setCards(cards.map((data) => ({
                cardId: data._id,
                name: data.name,
                link: data.link,
                likes: data.likes
            })))
        })
            .catch((err) => console.log(err))
    }, []);


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container" onClick={() => {
                    onEditAvatar(true)
                }}>
                    <img className="profile__avatar"  alt="" src={userAvatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__button profile__button_active_edit"
                                aria-label="Редактировать"
                                type="button"
                                onClick={() => {
                                    onEditProfile(true)
                                }}
                        />
                    </div>
                    <p className="profile__definition">{userDescription}</p>
                </div>
                <button className="profile__button profile__button_active_add"
                        aria-label="Добавить"
                        type="button"
                        onClick={() => {
                            onAddPlace(true)
                        }}
                />
            </section>
            <section className="elements" aria-label="Публикации">
                {cards.map((card) => (
                    <Card key={card.cardId}
                          name={card.name}
                          link={card.link}
                          likes={card.likes}
                          onCardClick={onCardClick}
                         />
                ))}
            </section>
        </main>
    );
}

export default Main