import React from "react";
import image from "../../assests/home_container.png";
import "./Blog.css";
import Navbar from "../../components/Navbar/Navbar";

const Blog = () => {
  return (
    <>
      <Navbar />
      <main className="blog-main">
        <h1 className="blog-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, est
          unde fugiat possimus amet iusto.lorem5
        </h1>
        <div className="blog-image">
          <img src={image} alt="cover image" />
        </div>
        <div className="blog-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          voluptatibus cupiditate hic ad adipisci? Quaerat dicta quidem fugiat
          quis odio, voluptates ipsam impedit nihil suscipit voluptate
          laudantium ipsa illum voluptatum ab cum ullam id nostrum? Neque, ipsum
          iusto. Totam dolores veniam, ullam dolorem quas et optio reiciendis
          excepturi perspiciatis ducimus laboriosam ipsa quia minima
          voluptatibus est tempore aliquid impedit neque maiores! Illum
          doloremque tempore facilis accusamus veritatis adipisci amet, magni
          odio rem ab aut laborum beatae quae, minus minima earum at! Nobis
          impedit eos ea accusamus, laboriosam iusto, debitis totam tempora
          inventore, necessitatibus itaque iure. Eum possimus, voluptate cumque
          rerum porro dolores iste repudiandae commodi numquam maiores itaque,
          libero aut blanditiis perspiciatis a assumenda ipsa. Obcaecati aliquam
          accusamus suscipit autem iure quod aut optio iusto, nam commodi
          eveniet, a delectus quis, officiis quibusdam consequatur eius minus
          assumenda voluptas quae nobis corporis odio quaerat? Omnis voluptatum
          inventore sapiente vel exercitationem repudiandae a voluptatibus sunt
          ab! Reiciendis dignissimos ipsam sequi assumenda temporibus? Dolorem
          tempore maxime voluptatibus? Doloremque qui consequuntur ab vel
          quisquam tempore, voluptate unde maiores! Blanditiis quae maiores
          corrupti omnis! Deserunt eum, dolorem molestiae officiis ratione,
          velit, accusamus non aperiam accusantium reiciendis laborum ab
          reprehenderit? Iusto fugiat repudiandae provident velit ullam
          excepturi, perspiciatis voluptate. Mollitia et doloremque perspiciatis
          dolorem hic reprehenderit inventore officia, repellat cum. Beatae
          dicta necessitatibus cum quos maxime reiciendis, consectetur sunt,
          labore voluptates dolore temporibus amet dignissimos, nesciunt est
          tempora iste officiis aspernatur! Officiis facilis tempore saepe earum
          ratione, veritatis provident ipsam incidunt vero laudantium architecto
          quidem mollitia eius amet iure labore aperiam, nihil quisquam. Nihil
          magnam amet quae quis assumenda vero nam blanditiis pariatur minus eum
          veritatis voluptas doloremque explicabo quaerat laborum repudiandae,
          libero quod. Recusandae, blanditiis. Maxime voluptatibus dignissimos
          fugiat, laborum quasi molestias aut facilis optio magnam, quos
          doloremque. Fugit qui rerum enim placeat, dolores nobis.
        </div>
      </main>
    </>
  );
};

export default Blog;
