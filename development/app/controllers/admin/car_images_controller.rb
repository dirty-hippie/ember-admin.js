require_relative "../../../lib/utils/file_string_io"

class Admin::CarImagesController < ActionController::Base

  def index
    render json: CarImage.paginate(page: params[:page], per_page: params[:per_page]).order('id desc')
  end

  def destroy
    CarImage.find_by_id(params[:id]).try(:destroy)
    render status: 204, nothing: true
  end

  def show
    render json: CarImage.find(params[:id])
  end

  def create
    car_image = CarImage.new(fetch_params)
    file = ::Utils::FileStringIO.new(request.raw_post, params[:original_filename])
    car_image.data = file
    car_image.save!
    render json: car_image
  end

  def update
    car_image = CarImage.find(params[:id])
    car_image.update_attributes(permit_params)
    render json: car_image
  end

  private

  def permit_params
    options = params.require(:car_image).permit(:id, :assetable_id, :assetable_type, :guid, :type, :data)
    options.delete(:data) unless options[:data].present?
    options
  end

  def fetch_params
    options = {}
    [:assetable_id, :assetable_type, :guid, :type].each do |param|
      options[param] = params[param]
    end
    options
  end
end
