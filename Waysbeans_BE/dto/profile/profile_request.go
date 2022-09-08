package profilesdto

type CreateProfileRequest struct {
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Gender   string `json:"gender" form:"gender" validate:"required"`
	Address  string `json:"address" form:"address" validate:"required"`
	PostCode string `json:"post_code" form:"post_code" validate:"required"`
}

type UpdateProfileRequest struct {
	Phone    string `json:"phone" form:"phone"`
	Gender   string `json:"gender" form:"gender"`
	Address  string `json:"address" form:"address"`
	PostCode string `json:"post_code" form:"post_code" validate:"required"`
}
