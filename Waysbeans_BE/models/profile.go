package models

type Profile struct {
	ID      int                  `json:"id"`
	Phone   string               `json:"phone" gorm:"type: varchar(255)"`
	Gender  string               `json:"gender" gorm:"type: varchar(255)"`
	Address string               `json:"address" gorm:"type: text"`
	UserID  int                  `json:"user_id"` //hanya digunakan untuk memanggil table relasinya
	User    UsersProfileResponse `json:"user"`    //untuk get datanya melalui user respons
}

type ProfileResponse struct {
	ID      int    `json:"id"`
	Phone   string `json:"phone"`
	Gender  string `json:"gender"`
	Address string `json:"address"`
	UserID  int    `json:"user_id"`
}
