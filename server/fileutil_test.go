package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestSyncDirectoryDoesNotError(t *testing.T) {
	dir := t.TempDir()
	if err := syncDirectory(dir); err != nil {
		t.Fatalf("syncDirectory(%s): %v", dir, err)
	}
	if err := syncDirectory(filepath.Dir(os.Args[0])); err != nil {
		t.Fatalf("syncDirectory(existing dir): %v", err)
	}
}
