import bottle
from bottle import route
from bottle import request, response, hook
from bottle import post
import json
import subprocess


_allow_origin = '*'
_allow_methods = 'PUT, GET, POST, DELETE, OPTIONS'
_allow_headers = 'Authorization, Origin, Accept, Content-Type, X-Requested-With'


def cmd_handler(cmd):
    result_lst = []
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for line in p.stdout.readlines():
        result_lst.append(line)
    _ = p.wait()
    return "<br>".join(result_lst)


@post('/')
def creation_handler():
    """Handles search_string and domain of search"""
    try:
        # parse input data
        try:
            data = json.load(request.body)
        except Exception:
            raise ValueError

        if data is None:
            raise ValueError

        # extract and validate name
        try:
            if not data['search_string'] or not data['domain']:
                raise ValueError
            search_string = data['search_string']
            domain = data['domain']
        except (TypeError, KeyError):
            raise ValueError

    except ValueError:

        response.status = 400
        return json.dumps({"text": "400"})

    except KeyError:

        response.status = 409
        return json.dumps({"text": "409"})

    string_to_execute = "ping -c %s %s" % (search_string, domain)
    reply = cmd_handler(string_to_execute)
    result_dict = {"text": reply}

    # return 200 Success
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(result_dict)


@hook('after_request')
def enable_cors():
    """Add headers to enable CORS"""
    response.headers['Access-Control-Allow-Origin'] = _allow_origin
    response.headers['Access-Control-Allow-Methods'] = _allow_methods
    response.headers['Access-Control-Allow-Headers'] = _allow_headers


@route('/', method='OPTIONS')
@route('/<path:path>', method='OPTIONS')
def options_handler(path=None):
    return


if __name__ == '__main__':
    bottle.run(host='127.0.0.1', port=8000)
