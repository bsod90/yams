App.Event.FIXTURES = [{
    id: 'event-1',
    title: 'Party for everybody',
    description: 'Some description',
    public: true,
    location: 'location-1',
    creator: 'user-1',
    startDate: moment(new Date()),
    endDate: moment(new Date()).add('days', 3),
    pictures: [
        'picture-1',
        'picture-2',
        'picture-3',
        'picture-4',
        'picture-5',
        'picture-6',
        'picture-7',
        'picture-8',
        'picture-9'
    ],
    cover: 'picture-2',
    participants: [
        'inv-1',
        'inv-2',
        'inv-3',
        'inv-4'
    ],
    comments: [
        'comment-1',
        'comment-2',
        'comment-3'
    ]
}]

App.Location.FIXTURES = [{
    id: 'location-1',
    address: 'Минск, Кедышко 26Б',
    latitude: 53.93367629999999,
    longitude: 27.631788899999947
}]

App.Invitation.FIXTURES = [{
    id: 'inv-1',
    user: 'user-1',
    event: 'event-1',
    acceptanceStatus: 'pending',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-2',
    user: 'user-3',
    event: 'event-1',
    acceptanceStatus: 'accepted',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-3',
    user: 'user-5',
    event: 'event-1',
    acceptanceStatus: 'rejected',
    link: 'http://localhost:8000/#join_event/1234'
}, {
    id: 'inv-4',
    user: 'user-2',
    event: 'event-1',
    acceptanceStatus: 'maybe',
    link: 'http://localhost:8000/#join_event/1234'
}]

App.User.FIXTURES = [{
    id: 'user-1',
    firstName: 'Maxim',
    lastName: 'Leonovich',
    email: 'lm.bsod@gmail.com'
}, {
    id: 'user-2',
    firstName: 'Andrew',
    lastName: 'Fan',
    email: 'beeprojectby@gmail.com',
}, {
    id: 'user-3',
    firstName: 'Superman',
    email: 'super@man.com'
}, {
    id: 'user-4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com'
}, {
    id: 'user-5',
    firstName: 'Федор',
    lastName: 'Хрущев',
    email: 'name.xru@gmail.com'
}, {
    id: 'user-6',
    firstName: 'Lunch',
    lastName: 'for Me',
    email: 'info@lunch-for.me'
}, {
    id: 'user-7',
    firstName: 'Dmitry',
    lastName: 'Vechorko',
    email: 'dmitry.vechorko@upsilonit.com'
}, {
    id: 'user-8',
    firstName: 'Nadzeya',
    lastName: 'Valkouskaya',
    email: 'tsiramisu@gmail.com'
}]

App.Picture.FIXTURES = [{
    id: 'picture-1',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'avatar.png',
    event: 'event-1',
    thumbnail: 'thumbnail-1'
}, {
    id: 'picture-2',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-3',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-4',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-5',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-6',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-7',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-8',
    url: 'https://www.filepicker.io/api/file/IvzcfvBSSY2iJQ4OqKdP',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-2'
}, {
    id: 'picture-9',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'denis',
    event: 'event-1',
    thumbnail: 'thumbnail-1'
}]

App.Thumbnail.FIXTURES = [{
    id: 'thumbnail-1',
    url: 'https://www.filepicker.io/api/file/lhDg6lzvQRuLJe2iUqUN',
    filename: 'avatar.png',
    picture: 'picture-1'
}, {
    id: 'thumbnail-2',
    url: 'https://www.filepicker.io/api/file/8AYb3KcSaWnjaN1ybd5h',
    filename: 'denis',
    picture: 'picture-2'
}]

App.Comment.FIXTURES = [{
    id: 'comment-1',
    event: 'event-1',
    author: 'user-1',
    creationTime: moment(new Date()),
    message: 'Cool story, bro!'
}, {
    id: 'comment-2',
    event: 'event-1',
    author: 'user-3',
    creationTime: moment(new Date()),
    message: 'I\'ve got a new haircut.'
}, {
    id: 'comment-3',
    event: 'event-1',
    author: 'user-2',
    creationTime: moment(new Date()),
    message: 'Why are you so happy?'
}]
