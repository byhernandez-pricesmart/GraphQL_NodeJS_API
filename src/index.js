const fetch = require("node-fetch");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Pokemon {
      name: String
      url: String
  }

  type Query {
    pokemons: [Pokemon]
    pokemon(id: ID): Pokemon
  }
`;

const resolvers = {
  Query: {
    pokemons: () => fetchPokemons(),
    pokemon: (parent, args) => {
        const { id } = args
        return fetchPokemonById({ id })
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url} port`);
});


fetchPokemons = () => {
    return fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then(json => json.results);  
}

fetchPokemonById = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/9`)
    .then(res => res.json())
    .then(json => json.results);  
}
