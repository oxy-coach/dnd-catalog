package main

import (
	"database/sql"
	"dnd-server/converter"
	"dnd-server/server"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var dbPath = "./db/spells.db"

// получение маппинга таблиц бд
func getTablesJson(tables []string) (map[string][]interface{}, error) {
	tablesMap := make(map[string][]interface{})

	database, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		panic(err)
		return tablesMap, err
	}
	defer database.Close()

	dbao := converter.DbDao{
		Db: database,
	}

	for _, tableName := range tables {
		query := fmt.Sprintf("SELECT * FROM %s", tableName)

		rows, err := dbao.GetTableRowsMap(query)
		if err != nil {
			panic(err)
			break
		}

		tablesMap[tableName] = rows
	}

	return tablesMap, nil
}

// обработка запроса на получение бд
func handleDbRequest(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Methods", "GET")
	// w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	// получение таблиц бд
	resp := make(map[string]map[string][]interface{})

	tables := []string{"spell", "class", "classSpells", "armor", "item", "tool", "weapon", "sets"}
	// tables := []string{"tool", "weapon"}
	db, err := getTablesJson(tables)
	if err != nil {
		log.Fatalf("err while getting tables: %s", err)
		return
	}
	resp["db"] = db

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened with json Marshal, Err: %s", err)
	}
	w.Write(jsonResp)

	return
}

func main() {
	server := server.NewServer()
	server.AddHandler("get-db", handleDbRequest)
	server.Up()
}
