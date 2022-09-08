package authdto

type RegisterResponse struct {
	Name   string `gorm:"type: varchar(255)" json:"name"`
	Token  string `gorm:"type: varchar(255)" json:"token"`
	Status string `json:"status" gorm:"type: varchar(255)"`
}

type LoginResponse struct {
	Name   string `gorm:"type: varchar(255)" json:"name"`
	Email  string `gorm:"type: varchar(255)" json:"email"`
	Token  string `gorm:"type: varchar(255)" json:"token"`
	Status string `json:"status" gorm:"type: varchar(255)"`
}

type CheckAuthResponse struct {
	Id     int    `gorm:"type: int" json:"id"`
	Name   string `gorm:"type: varchar(255)" json:"name"`
	Email  string `gorm:"type: varchar(255)" json:"email"`
	Status string `gorm:"type: varchar(50)"  json:"status"`
}
