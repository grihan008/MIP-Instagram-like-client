
angular.module('someklone.services').factory('Posts', function($q, $http, appConfig, $cordovaFileTransfer) {

    var posts = [];

    return {
        // posts from myself and the from the users i am following
        following: function(id)
        {
            return $q(function(resolve, reject){
                $http.get(appConfig.apiAddr + "posts/relevant/"+id).then(function(response){
                    posts = posts.concat(response.data);
                    resolve(posts);
                },function(err){
                    reject();
                });
            });
        },
        // most recent posts
        recent: function()
        {
            return $q(function(resolve, reject){
                resolve(posts);
            });
        },
        // search posts based on tags
        searchTag: function()
        {
            return $q(function(resolve, reject){
                resolve(posts);
            });
        },
        // get all posts of single user
        getUserPosts: function(userId)
        {
            return $q(function(resolve, reject){
                $http.get(appConfig.apiAddr + "posts/" + userId).then(function(response){
                    resolve(response.data);
                });
                // execute the search and return results
                // resolve(posts); // placeholder
            });
        },
        getPost: function(postid){
            return $q(function(resolve, reject){
                $http.get(appConfig.apiAddr + "post/" + postid).then(function(response){
                    resolve(response.data);
                });
            });
        },
        new: function(imageUri, caption)
        {
            return $q(function(resolve, reject) {
                // var newPost = {
                //     id: posts.length,
                //     user: {
                //         id: 1,
                //         username: "dtrump",
                //         profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
                //     },
                //     image: imageUri,
                //     imageThumbnail: imageUri, // no special thumbnail yet, but there will be when the image is eventually uploaded to server
                //     likes: 0,
                //     userLike: false,
                //     caption: caption,
                //     tags: [],  // tag identification logic not yet implemented
                //     comments: []
                // };

                // posts.unshift(newPost);
            //     var options = new FileUploadOptions();
            //     options.fileKey = "image";

            //     $cordovaFileTransfer.upload(appConfig.apiAddr + "upload", $scope.picture, options).then(function(result) {

            //     resolve(result);
            // });
            });
        },
        toggleLike: function(post)
        {
            if(post.userLike)
            {
                post.likes--;
            }
            else{
                post.likes++;
            }
            post.userLike = !post.userLike;
        },
        getCommentsForPost: function(postId)
        {
            return $q(function(resolve, reject){
                var post = posts.find(function(element){
                    return element.id == postId
                });

                if(post !== undefined)
                {
                    resolve(post.comments);
                }
                else
                {
                    reject();
                }
            });
        },
        addCommentToPost: function(postId, comment)
        {
            return $q(function(resolve, reject){
                var post = posts.find(function(element){
                    return element.id == postId
                });

                if(post !== undefined)
                {
                    post.comments.push({
                        id: post.comments.length,
                        user: {
                            id: 1,
                            username: "HillaryC",
                            profileImageSmall: "https://pbs.twimg.com/profile_images/750300510264107008/G8-PA5KA.jpg"
                        },
                        comment: comment,
                        userRefs: [],
                        tags: []
                    });
                    resolve();
                }
                else
                {
                    reject();
                }
            });
        }
    };
});
