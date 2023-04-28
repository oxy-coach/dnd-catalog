package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DbRequestPath string `mapstructure:"DB_REQUEST_PATH"`
	Port          string `mapstructure:"SERVER_PORT"`
}

func goDotEnvVariable(key string) string {
	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func LoadConfig() (config Config) {
	config.DbRequestPath = goDotEnvVariable("DB_REQUEST_PATH")
	config.Port = goDotEnvVariable("SERVER_PORT")

	return config
}
