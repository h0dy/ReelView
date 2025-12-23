package client

type Movie struct {
	// Adult            bool    `json:"adult"`
	BackdropPath     string   `json:"backdrop_path"`
	GenreIds         []int    `json:"genre_ids"`
	Genre            []string `json:genre`
	ID               int      `json:"id"`
	OriginalLanguage string   `json:"original_language"`
	OriginalTitle    string   `json:"original_title"`
	Overview         string   `json:"overview"`
	// Popularity       float64 `json:"popularity"`
	PosterPath  string `json:"poster_path"`
	ReleaseDate string `json:"release_date"`
	Title       string `json:"title"`
	// Video            bool    `json:"video"`
	// VoteAverage      float64 `json:"vote_average"`
	// VoteCount        int     `json:"vote_count"`
}

// type MovieResponse struct {
// 	Backdrop         string  `json:"backdrop_path"`
// 	GenreIds         []int   `json:"genre_ids"`
// 	ID               int     `json:"id"`
// 	OriginalLanguage string  `json:"original_language"`
// 	OriginalTitle    string  `json:"original_title"`
// 	Overview         string  `json:"overview"`
// 	Poster           string  `json:"poster_path"`
// 	ReleaseDate      string  `json:"release_date"`
// 	Title            string  `json:"title"`
// }

// type MoviesResponse struct {
// 	Page         int     `json:"page"`
// 	Results      []MovieResponse `json:"results"`
// 	TotalPages   int     `json:"total_pages"`
// 	TotalResults int     `json:"total_results"`
// }

type Movies struct {
	Page         int     `json:"page"`
	Results      []Movie `json:"results"`
	TotalPages   int     `json:"total_pages"`
	TotalResults int     `json:"total_results"`
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
