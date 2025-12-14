package auth

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const tokenSecretTest = "90s7dfsldjfnlshvci686gbidsahfgknj,l324l5h"

func TestJWT(t *testing.T) {
	// Test: Valid token 1
	newUserID := uuid.New()
	token, _ := MakeJWT(newUserID, tokenSecretTest, time.Minute*10)
	userID, err := ValidateJWT(token, tokenSecretTest)
	require.NoError(t, err)
	assert.Equal(t, newUserID, userID)

	// Test: Invalid token 1
	userID = uuid.New()
	token, _ = MakeJWT(userID, tokenSecretTest, time.Minute*10)
	_, err = ValidateJWT(token, "invalid-token")
	require.Error(t, err)
}
