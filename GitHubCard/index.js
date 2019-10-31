
(async()=>{
  let res = await axios.get('https://api.github.com/users/jmjles');
  let user = res.data;
  cardConstruct(user);

  let res2 = await axios.get(user.followers_url);
  user = res2.data;
  user.map(async(user) => {
    let follower = await axios.get(`https://api.github.com/users/${user.login}`);
    cardConstruct(follower.data)
  })

})();


let cardConstruct = (user) => {
  let cards = document.querySelector('.cards');
  let template =
  `
  <a href=${user.html_url} target="_blank">
  <div class="card">
  <img src=${user.avatar_url}/>
  <div class="card-info">
    <h3 class="name"> ${user.name}</h3>
    <p class="username"> ${user.login}</p>
    <p>Location: ${user.location}</p>
    <p>Followers: ${user.followers}</p>
    <p>Following: ${user.following}</p>
    <p>Bio: ${user.bio}</p>
  </div>
</div>
</a>
  `;
  cards.innerHTML += template;
  const card = document.querySelectorAll('.card');

  card.forEach(item =>{
    item.addEventListener('mouseenter',()=>
      anime({
        targets:item,
        scale:1.2
      })
  )
    item.addEventListener('mouseleave', () =>
      anime({
        targets: item,
        scale: 1
      })
    )
})
}