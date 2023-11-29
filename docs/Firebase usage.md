# Firebase usage

## Example of nested collections
When storing pins(posts), we shall store them in subcollection under a user.
[Subcollection](https://firebase.google.com/docs/firestore/data-model#subcollections)

## User
Only store user id on Firestore

## Teasers/Partial loading
https://medium.com/@peterkracik/my-approach-to-structure-firestore-without-exploding-the-budget-b5633e4f6dd7

## Firestore update
https://firebase.google.com/docs/firestore/manage-data/add-data#update-data

## Firestore structure
- Users (collection)
    - 12klfs312rijf3221s=weroi2sdf32 (document)
      - fullName: "Wong Pak Long"
      - displayName: "Jasper"
      - profilePicture: "default-avatar.jpg"
      - follows: ["2387dgh2378chr2t7xtrn23723eb3d"]
      - followedBy: []
    - 2387dgh2378chr2t7xtrn23723eb3d (document)
- Posts (collection)
    - 9832rhj989ewhdihdqoq289yh378g4 (document)
        - createdBy: "Jasper"
        - title: "Post Title"
        - content: "Post Content"
        - createdAt: "Timestamp"
        - modifiedAt: "Timestamp"
        - likedBy: ["Jasper"]
        - dislikedBy: []
        - Comments (sub-collection)