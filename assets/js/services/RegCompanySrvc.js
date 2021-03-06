app.service('RegCompanySrvc', ['ReqHandlingSrvc', '$q', function(ReqHandlingSrvc, $q) {
    return {
        createCompany : function(data) {
            var url = '/company';
            var call = $q.defer();
            console.log('in service')
            ReqHandlingSrvc.put(url, data)
                .then(function(res) {
                    call.resolve(res);
                })
                .catch(function(err) {
                    call.reject(err);
                })
            return call.promise;
        },

        getCompany : function(id) {
            var url = '/company/'+id;
            var call = $q.defer();
            ReqHandlingSrvc.get(url)
                .then(function(res) {
                    call.resolve(res);
                })
                .catch(function(err) {
                    call.reject(err);
                })
            return call.promise;
        },

        getCompanies : function(data){
            var url = '/company';
            var call = $q.defer();
            ReqHandlingSrvc.post(url, data)
                .then(function(res) {
                    console.log(res);
                    call.resolve(res);
                })
                .catch(function(err) {
                    console.log(err);
                    call.reject(err);
                })
            return call.promise;            
        }
        
    }
}]);