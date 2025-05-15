import json
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models import Matakuliah

@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    try:
        query = request.dbsession.query(Matakuliah)
        matakuliah_list = query.all()
        
        result = [matakuliah.to_json() for matakuliah in matakuliah_list]
        
        return result
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def get_matakuliah(request):
    try:
        mk_id = int(request.matchdict['id'])
        matakuliah = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
        
        if matakuliah is not None:
            return matakuliah.to_json()
        else:
            return Response(json_body={'error': 'Matakuliah not found'}, status=404)
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

@view_config(route_name='matakuliah_add', renderer='json', request_method='POST')
def add_matakuliah(request):
    try:
        json_body = request.json_body
        matakuliah = Matakuliah(
            kode_mk=json_body['kode_mk'],
            nama_mk=json_body['nama_mk'],
            sks=json_body['sks'],
            semester=json_body['semester']
        )
        
        request.dbsession.add(matakuliah)
        request.dbsession.flush()
        
        return Response(
            json_body={
                'status': 'success',
                'message': 'Matakuliah berhasil ditambahkan',
                'data': matakuliah.to_json()
            },
            status=201
        )
    except KeyError:
        return Response(json_body={'error': 'Data tidak lengkap'}, status=400)
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

@view_config(route_name='matakuliah_update', renderer='json', request_method='PUT')
def update_matakuliah(request):
    try:
        mk_id = int(request.matchdict['id'])
        json_body = request.json_body
        
        matakuliah = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
        
        if matakuliah is not None:
            matakuliah.kode_mk = json_body.get('kode_mk', matakuliah.kode_mk)
            matakuliah.nama_mk = json_body.get('nama_mk', matakuliah.nama_mk)
            matakuliah.sks = json_body.get('sks', matakuliah.sks)
            matakuliah.semester = json_body.get('semester', matakuliah.semester)
            
            return Response(
                json_body={
                    'status': 'success',
                    'message': 'Matakuliah berhasil diupdate',
                    'data': matakuliah.to_json()
                },
                status=200
            )
        else:
            return Response(json_body={'error': 'Matakuliah not found'}, status=404)
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

@view_config(route_name='matakuliah_delete', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    try:
        mk_id = int(request.matchdict['id'])
        matakuliah = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
        
        if matakuliah is not None:
            request.dbsession.delete(matakuliah)
            
            return Response(
                json_body={
                    'status': 'success',
                    'message': 'Matakuliah berhasil dihapus'
                },
                status=200
            )
        else:
            return Response(json_body={'error': 'Matakuliah not found'}, status=404)
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)