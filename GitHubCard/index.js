
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
  <div class="card">
  <img src=${user.avatar_url}/>
  <div class="card-info">
    <h3 class="name"> ${user.name}</h3>
    <p class="username"> ${user.login}</p>
    <p>Location: ${user.location}</p>
    <p>Profile:  
      <a href={address to users github page}> ${user.url}</a>
    </p>
    <p>Followers: ${user.followers}</p>
    <p>Following: ${user.following}</p>
    <p>Bio: ${user.bio}</p>
  </div>
</div>
  `
  cards.innerHTML += template
}