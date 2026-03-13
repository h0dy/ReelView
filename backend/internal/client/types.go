package client

type Movie struct {
	BackdropPath     string   `json:"backdrop_path"`
	GenreIds         []int    `json:"genre_ids"`
	Genre            []string `json:"genre"`
	ID               int      `json:"id"`
	OriginalLanguage string   `json:"original_language"`
	OriginalTitle    string   `json:"original_title"`
	Overview         string   `json:"overview"`
	PosterPath  string  `json:"poster_path"`
	ReleaseDate string  `json:"release_date"`
	Title       string  `json:"title"`
	VoteAverage float64 `json:"vote_average"`
	VoteCount   int     `json:"vote_count"`
	Tagline     string  `json:"tagline"`
	TmdbID      int     `json:"tmdb_id"`
	Runtime     int     `json:"runtime"`
	Status      string  `json:"status"`
}

type Movies struct {
	Page         int     `json:"page"`
	Results      []Movie `json:"results"`
	TotalPages   int     `json:"total_pages"`
	TotalResults int     `json:"total_results"`
}

type MovieDetails struct {
	// Adult               bool        `json:"adult"`
	BackdropPath string `json:"backdrop_path"`
	// BelongsToCollection interface{} `json:"belongs_to_collection"`
	Budget int `json:"budget"`
	Genres []struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	} `json:"genres"`
	Homepage            string  `json:"homepage"`
	ID                  int     `json:"id"`
	ImdbID              string  `json:"imdb_id"`
	OriginalLanguage    string  `json:"original_language"`
	OriginalTitle       string  `json:"original_title"`
	Overview            string  `json:"overview"`
	Popularity          float64 `json:"popularity"`
	PosterPath          string  `json:"poster_path"`
	ProductionCompanies []struct {
		ID            int    `json:"id"`
		LogoPath      string `json:"logo_path"`
		Name          string `json:"name"`
		OriginCountry string `json:"origin_country"`
	} `json:"production_companies"`
	ProductionCountries []struct {
		Iso31661 string `json:"iso_3166_1"`
		Name     string `json:"name"`
	} `json:"production_countries"`
	ReleaseDate     string `json:"release_date"`
	Revenue         int    `json:"revenue"`
	Runtime         int    `json:"runtime"`
	SpokenLanguages []struct {
		EnglishName string `json:"english_name"`
		Iso6391     string `json:"iso_639_1"`
		Name        string `json:"name"`
	} `json:"spoken_languages"`
	Status      string  `json:"status"`
	Tagline     string  `json:"tagline"`
	Title       string  `json:"title"`
	Video       bool    `json:"video"`
	VoteAverage float64 `json:"vote_average"`
	VoteCount   int     `json:"vote_count"`
}

var MovieGenre = map[int]string{
	28:    "Action",
	12:    "Adventure",
	16:    "Animation",
	35:    "Comedy",
	80:    "Crime",
	99:    "Documentary",
	18:    "Drama",
	10751: "Family",
	14:    "Fantasy",
	36:    "History",
	27:    "Horror",
	10402: "Music",
	9648:  "Mystery",
	10749: "Romance",
	878:   "Science Fiction",
	10770: "TV Movie",
	53:    "Thriller",
	10752: "War",
	37:    "Western",
}
