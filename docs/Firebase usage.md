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
      - bio: "I am a cool guy"
      - profilePicture: "default-avatar.jpg"
      - follows: ["2387dgh2378chr2t7xtrn23723eb3d"]
      - followedBy: []
    - 2387dgh2378chr2t7xtrn23723eb3d (document)
- Posts (collection)
    - 9832rhj989ewhdihdqoq289yh378g4 (document)
        - createdBy: "12klfs312rijf3221s=weroi2sdf32" // uid of creator
        - title: "Post Title"
        - content: "Post Content"
        - posterPath: "https://image.tmdb.org/t/p/original/3GqP4HxjpVe0ChBAStTbkZhpWYC.jpg"
        - TMDBsourceID: 1068236
        - TMDBgenreID: [35]
        - TMDBdateOfMovieRelease: "1933-06-14"
        - createdAt: "Timestamp"
        - modifiedAt: "Timestamp"
        - likedBy: ["u0gSii1Srsfy6gd7wOvYdtMObhp2"] // uid of users who liked
        - dislikedBy: []
        - Comments (sub-collection)
          - mQASwrbGfT6iYpjkNLFH (document)
            - content: "Comment"
            - createdAt: "Timestamp"
            - createdBy: "67XI4DS0oKdTcg9kXuRAEQs3gR03" // uid

## Querying Firestore
```
const userCollectionRef = collection(db, 'Users');
const q = query(userCollectionRef, where("uid", "==", model.user.uid));
```