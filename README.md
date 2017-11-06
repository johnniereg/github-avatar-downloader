# GitHub Avatar Downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

## Results

We should find a folder called avatars in the current directory.

The avatars folder should contain images corresponding to the avatars of the contributors of the repo.

The name of each image file should be the contributor's name and the file extension (ex. johnny.png)