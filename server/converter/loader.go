package converter

import (
	"database/sql"
)

type DbDao struct {
	Db *sql.DB
}

func (d *DbDao) GetTableRowsMap(queryText string) ([]interface{}, error) {

	var result []interface{}
	rows, err := d.Db.Query(queryText)

	if rows == nil {
		return result, err
	}
	defer rows.Close()
	if err != nil {
		return result, err
	}

	columnTypes, err := rows.ColumnTypes()
	if err != nil {
		return result, err
	}

	count := len(columnTypes)
	finalRows := []interface{}{}

	for rows.Next() {
		scanArgs := make([]interface{}, count)
		for i, v := range columnTypes {
			switch v.DatabaseTypeName() {
			case "varchar", "TEXT", "TIMESTAMP":
				scanArgs[i] = new(sql.NullString)
				break
			case "FLOAT":
				scanArgs[i] = new(sql.NullFloat64)
				break
			case "INTEGER":
				scanArgs[i] = new(sql.NullInt64)
				break
			default:
				scanArgs[i] = new(sql.NullString)
			}
		}

		err := rows.Scan(scanArgs...)

		if err != nil {
			return result, err
		}

		masterData := map[string]interface{}{}

		for i, v := range columnTypes {

			if z, ok := (scanArgs[i]).(*sql.NullBool); ok {
				masterData[v.Name()] = z.Bool
				continue
			}

			if z, ok := (scanArgs[i]).(*sql.NullString); ok {
				masterData[v.Name()] = z.String
				continue
			}

			if z, ok := (scanArgs[i]).(*sql.NullInt64); ok {
				masterData[v.Name()] = z.Int64
				continue
			}

			if z, ok := (scanArgs[i]).(*sql.NullFloat64); ok {
				masterData[v.Name()] = z.Float64
				continue
			}

			if z, ok := (scanArgs[i]).(*sql.NullInt32); ok {
				masterData[v.Name()] = z.Int32
				continue
			}

			masterData[v.Name()] = scanArgs[i]
		}

		finalRows = append(finalRows, masterData)
	}

	return finalRows, nil
}
